import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render as customRender } from "@/lib/test-utils";
import RegisterPage from "./page";
import { signIn } from "next-auth/react";
import { AuthService } from "@/lib/api/services/AuthService";

vi.mock("next-auth/react", () => ({
    useSession: () => ({
        data: null,
        status: "unauthenticated",
    }),
    signIn: vi.fn(),
    SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

vi.mock("@/lib/api/services/AuthService", () => ({
    AuthService: {
        authRegisterCreate: vi.fn(),
    },
}));

describe("RegisterPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render registration form", () => {
        customRender(<RegisterPage />);
        expect(screen.getByLabelText(/i want to/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("should show validation errors for mismatched passwords", async () => {
        const user = userEvent.setup();
        customRender(<RegisterPage />);

        // Select role
        const roleSelect = screen.getByLabelText(/i want to/i);
        await user.click(roleSelect);
        await user.click(screen.getByText(/book properties/i));

        // Fill form
        await user.type(screen.getByLabelText(/email/i), "test@example.com");
        await user.type(screen.getByLabelText(/^password$/i), "Password123");
        await user.type(
            screen.getByLabelText(/confirm password/i),
            "DifferentPassword123"
        );

        const submitButton = screen.getByRole("button", {
            name: /create account/i,
        });
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/passwords don't match/i)
            ).toBeInTheDocument();
        });
    });
});

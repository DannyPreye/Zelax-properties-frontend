'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = 'zelax-cookie-consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPrefs = JSON.parse(consent);
      setPreferences(savedPrefs);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyEssential);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-background border rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    We use cookies
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We use cookies to enhance your browsing experience, serve
                    personalized content, and analyze our traffic. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleAcceptAll} size="sm">
                      Accept All
                    </Button>
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      size="sm"
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={() => setShowPreferences(true)}
                      variant="ghost"
                      size="sm"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Customize
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0 p-1 rounded-lg hover:bg-accent"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable
              different types of cookies below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="essential"
                  checked={preferences.essential}
                  disabled
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="essential" className="font-semibold">
                    Essential Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    These cookies are necessary for the website to function and
                    cannot be switched off. They are usually set in response to
                    actions made by you.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Analytics Cookies */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      analytics: checked === true,
                    }))
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="analytics" className="font-semibold">
                    Analytics Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Marketing Cookies */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      marketing: checked === true,
                    }))
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="marketing" className="font-semibold">
                    Marketing Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    These cookies are used to deliver advertisements and track
                    your activity across the internet to help advertisers deliver
                    more relevant advertising.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPreferences(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}









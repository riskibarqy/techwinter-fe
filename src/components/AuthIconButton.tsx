import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export function AuthIconButton() {
  return (
    <SignInButton
      mode="modal"
      forceRedirectUrl="/post-auth/sign-in?app_id=techwinter_app"
      signUpForceRedirectUrl="/post-auth/sign-up?app_id=techwinter_app"
    >
      {/* This MUST be a span, not a button, to avoid nesting issues */}
      <motion.span
        className="text-gray-300 hover:text-white transition-colors relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="h-6 w-6" />
      </motion.span>
    </SignInButton>
  );
}

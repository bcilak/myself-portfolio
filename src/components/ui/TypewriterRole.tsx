"use client";
import React, { useState, useEffect } from "react";

export default function TypewriterRole({ roles, speed = 80, pause = 2000 }: { roles: string[], speed?: number, pause?: number }) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeoutId = setTimeout(() => {}, speed);
      } else {
        timeoutId = setTimeout(() => setText(currentRole.substring(0, text.length - 1)), speed / 2);
      }
    } else {
      if (text === currentRole) {
        timeoutId = setTimeout(() => setIsDeleting(true), pause);
      } else {
        timeoutId = setTimeout(() => setText(currentRole.substring(0, text.length + 1)), speed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, roleIndex, roles, speed, pause]);

  return (
    <span className="inline-block gradient-text font-bold">
      {text}
      <span className="animate-pulse text-cyan-500 opacity-80 backdrop-blur-sm">|</span>
    </span>
  );
}

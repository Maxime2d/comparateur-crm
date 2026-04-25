"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  phrases: string[];
  /** Vitesse de frappe en ms par caractère */
  typeSpeed?: number;
  /** Vitesse d'effacement en ms par caractère */
  deleteSpeed?: number;
  /** Pause après avoir tapé une phrase complète */
  pauseAfterType?: number;
  /** Pause après effacement complet avant la phrase suivante */
  pauseAfterDelete?: number;
  /** Couleur du curseur (classe Tailwind ou couleur hex) */
  cursorClassName?: string;
  className?: string;
}

/**
 * Composant typewriter qui boucle sur une liste de phrases.
 * Chaque phrase est tapée caractère par caractère, puis effacée, puis la suivante apparaît.
 */
export function TypewriterText({
  phrases,
  typeSpeed = 70,
  deleteSpeed = 35,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
  cursorClassName = "bg-violet-400",
  className = "",
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === currentPhrase) {
      // Phrase complète — pause puis on commence à effacer
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType);
    } else if (isDeleting && displayed === "") {
      // Effacement complet — pause puis on passe à la phrase suivante
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, pauseAfterDelete);
    } else {
      // En cours de frappe ou d'effacement
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timeout = setTimeout(() => {
        setDisplayed((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentPhrase.slice(0, prev.length + 1),
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayed,
    isDeleting,
    phraseIndex,
    phrases,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[3px] h-[0.85em] align-middle ml-1 -mb-1 animate-[blink_1s_step-end_infinite] ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
}

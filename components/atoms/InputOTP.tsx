import { Icon } from "@iconify/react";
import { useMemo, useRef } from "react";

interface InputOTPProps {
  length: number;
  className?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputOTP({
  length,
  className,
  error,
  value,
  onChange,
}: InputOTPProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const values = useMemo(
    () => Array.from({ length }, (_, index) => value[index] || ""),
    [length, value]
  );

  const focusInput = (index: number) => {
    const target = inputRefs.current[index];
    if (!target) return;

    target.focus();
    target.select();
  };

  const updateValueAtIndex = (index: number, nextInput: string) => {
    const sanitizedValue = nextInput.replace(/\s/g, "");
    if (!sanitizedValue) {
      const nextValues = [...values];
      nextValues[index] = "";
      onChange(nextValues.join(""));
      return;
    }

    const nextValues = [...values];
    const nextChars = sanitizedValue.slice(0, length - index).split("");

    nextChars.forEach((char, charIndex) => {
      nextValues[index + charIndex] = char;
    });

    onChange(nextValues.join(""));

    const nextFocusIndex = Math.min(index + nextChars.length, length - 1);
    focusInput(nextFocusIndex);
  };

  const handleBackspace = (index: number) => {
    const nextValues = [...values];

    if (nextValues[index]) {
      nextValues[index] = "";
      onChange(nextValues.join(""));

      if (index > 0) {
        focusInput(index - 1);
      }
      return;
    }

    if (index > 0) {
      nextValues[index - 1] = "";
      onChange(nextValues.join(""));
      focusInput(index - 1);
    }
  };

  return (
    <div className={`space-y-2  ${className}`}>
      <div className={`flex items-center justify-center gap-4`}>
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className={`w-20 h-20 flex items-center justify-center gap-2 rounded-lg ${
              error
                ? "border-2 border-red-500"
                : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
            } group transition-all duration-200`}
          >
            <input
              type="text"
              placeholder="-"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              className="bg-transparent border-none outline-none text-3xl flex-1 placeholder:text-slate-600 w-16 h-16 text-center"
              value={values[index]}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              onChange={(e) => updateValueAtIndex(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  e.preventDefault();
                  handleBackspace(index);
                }

                if (e.key === "ArrowLeft" && index > 0) {
                  e.preventDefault();
                  focusInput(index - 1);
                }

                if (e.key === "ArrowRight" && index < length - 1) {
                  e.preventDefault();
                  focusInput(index + 1);
                }
              }}
              onFocus={(e) => e.target.select()}
            />
          </div>
        ))}
      </div>
      {!!error && (
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:information-outline"
            width={16}
            className="text-red-500"
          />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

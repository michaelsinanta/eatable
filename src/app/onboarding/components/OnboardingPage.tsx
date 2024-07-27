"use client";

import React from "react";
import { useState } from "react";
import { Checkbox, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { tags } from "../../../constant/tags";
import { onboardingUser } from "../actions/onboarding.action";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export function OnboardingPage({ email }: { email: string }) {
  const { pending } = useFormStatus();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleCheckboxChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag],
    );
  };

  const handleNext = async () => {
    try {
      const res = await onboardingUser(email, selectedTags);
      if (res.success) {
        router.push("/onboarding/post");
      }
    } catch (err) {}
  };

  return (
    <>
      <TextInput
        type="text"
        placeholder="Search here..."
        rightIcon={HiSearch}
        className="mb-4 w-full [&_input]:border-[#00AE4F] [&_input]:bg-green-50 [&_svg]:text-[#00AE4F]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p className="text-[#878787] font-light text-start w-full">
        Select <span className="font-bold text-black">one or more</span> food
        hypersensitivity needs from our catalogue.
      </p>
      <div className="h-full flex flex-col gap-4 overflow-y-auto hide-scrollbar">
        {tags
          .filter((tag) =>
            tag.toLowerCase().includes(searchTerm.trim().toLowerCase()),
          )
          .map((tag, index) => (
            <div
              key={index}
              className={`font-light w-full flex items-center tags-center justify-between p-3 mb-2 rounded-lg ${
                selectedTags.includes(tag)
                  ? "bg-[#00AE4F] text-white shadow-md shadow-green-200"
                  : "border border-[#00AE4F] text-[#262626]"
              }`}
              onClick={() => handleCheckboxChange(tag)}
            >
              <span>{tag}</span>
              <Checkbox
                checked={selectedTags.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
                className={
                  selectedTags.includes(tag)
                    ? "focus:ring-white border-white text-[#00AE4F] "
                    : "text-[#00AE4F] border-[#00AE4F]"
                }
              />
            </div>
          ))}
      </div>
      <div className="w-full bg-white flex-shrink-0 h-12 mt-4">
        <button
          onClick={handleNext}
          disabled={pending}
          className="w-full justify-center rounded-lg bg-[#00AE4F] px-5 py-3 text-center text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          Next
        </button>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type ShopDetailVoteProps = {
  initialVotes: number;
};

export function ShopDetailVote({ initialVotes }: ShopDetailVoteProps) {
  const [extraVotes, setExtraVotes] = useState(0);

  return (
    <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
      <p className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">{initialVotes + extraVotes}票</p>
      <Button type="button" className="w-full sm:w-auto" onClick={() => setExtraVotes((value) => value + 1)}>
        投票する
      </Button>
    </div>
  );
}

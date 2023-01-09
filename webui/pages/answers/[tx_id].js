import React, { useContext, useState, useEffect } from "react";
import { postDetailQuery } from "../../services";
import { BigNumber } from "bignumber.js";
import Link from "next/link";
import {
  ThreeColumnLayout,
  PostDetailCard,
  PostReplyCard,
  Composer,
  SimplePostCard,
  DetailPostCard,
  Loader,
} from "../../components";
import { useRouter } from "next/router";
import { useTuning } from "../../context/TuningContext";
import { useAPI } from "../../hooks/useAPI";
import { useBitcoin } from "../../context/BitcoinContext";

/* export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const postDetail = await postDetailQuery(id);
  return { props: { postDetail } };
} */

export default function DetailPage() {
  const [post, setPost] = useState();
  const router = useRouter();
  const { tx_id } = router.query;
  const { authenticated } = useBitcoin();
  const { startTimestamp } = useTuning();

  let { data, error, refresh, loading } = useAPI(
    tx_id !== undefined ? `/answers/${tx_id}` : null //?start_timestamp=${startTimestamp}`
  );

  let answer = data?.answer;

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen pb-20">
        <svg
          onClick={() => router.back()}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="relative top-[69px] -left-[42px] w-6 h-6 stroke-gray-700 dark:stroke-gray-300 cursor-pointer hover:opacity-70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <div className="mt-4 lg:mt-10">
          {loading && <Loader />}
          {!loading && !error && <SimplePostCard post={answer} />}
        </div>
      </div>
    </ThreeColumnLayout>
  );
}

import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useAPI } from "../../hooks/useAPI";
import { useTuning } from "../../context/TuningContext";

const Answers = () => {
  const { startTimestamp } = useTuning();
  let {
    data,
    error,
    refresh,
    loading: answers_loading,
  } = useAPI(`/answers?start_timestamp=${startTimestamp}`);
  let { data: recent, loading: recent_loading } = useAPI(
    "/recent/answers?limit=100"
  );

  let answers = data?.answers;
  let boosted_tx = answers?.map((a) => a.tx_id);
  let recent_answers = recent?.answers;
  recent_answers = recent_answers?.filter(
    (a) => !boosted_tx?.includes(a.tx_id)
  );

  return (
    <Dashboard
      data={answers}
      recent={recent_answers}
      error={error}
      loading={answers_loading || recent_loading}
    />
  );
};

export default Answers;

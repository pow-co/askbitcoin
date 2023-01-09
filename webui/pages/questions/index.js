import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useAPI } from "../../hooks/useAPI";
import { useTuning } from "../../context/TuningContext";

const Questions = () => {
  const { startTimestamp } = useTuning();
  let {
    data,
    error,
    refresh,
    loading: questions_loading,
  } = useAPI(`/questions?start_timestamp=${startTimestamp}`);
  let { data: recent, loading: recent_loading } = useAPI(
    "/recent/questions?limit=100"
  );

  let questions = data?.questions;
  let boosted_tx = questions?.map((q) => q.tx_id);
  let recent_questions = recent?.questions;
  recent_questions = recent_questions?.filter(
    (q) => !boosted_tx?.includes(q.tx_id)
  );

  return (
    <Dashboard
      data={questions}
      recent={recent_questions}
      error={error}
      loading={questions_loading || recent_loading}
    />
  );
};

export default Questions;

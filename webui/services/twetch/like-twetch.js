const likeTwetch = async (txid) => {
  const payload = {
    action: "twetch/like@0.0.1",
    args: {
      postTransaction: txid,
      clientIdentifier: process.env.TWETCH_CLIENT_IDENTIFIER,
    },
  };
  if (
    localStorage.seed &&
    localStorage.tokenTwetchAuth &&
    localStorage.paymail
  ) {
    try {
      const resp = await fetch("/api/publish", {
        method: "POST",
        body: JSON.stringify({
          seed: localStorage.seed,
          paymail: localStorage.paymail,
          payload: payload,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
          "content-type": "application/json",
        },
      });
      const result = await resp.json();
      if (result.txid) {
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("please, log in");
  }
};

export default likeTwetch;

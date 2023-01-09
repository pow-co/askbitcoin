import axios from "axios";

const postTwetch1 = async (content, replyTxid, successCallback) => {
  let mapReply = "null";
  if (replyTxid !== undefined) {
    mapReply = replyTxid;
  }
  const payload = {
    action: "twetch/post@0.0.1",
    payParams: {
      tweetFromTwetch: false,
      hideTweetFromTwetchLink: true,
    },
    args: {
      bContent: content,
      bFilename: `twetch_twtext_${new Date().getTime()}.txt`,
      type: "post",
      mapReply: mapReply,
      mapTwdata: "null",
      mapComment: JSON.stringify({ origin: "askbitcoin.ai" }),
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
      if (result) {
        console.log(result.txId);
        successCallback();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("please, log in");
  }
};

const postTwetch = async (wallet, content) => {
  let res = await axios.post("http://localhost:5200/api/v1/posts/new", null, {
    params: {
      content,
      replyTxId: null,
      tags: null,
    },
  });
  let outputs = res.data.outputs;
  let contentHash = res.data.contentHash;
};
export default postTwetch;

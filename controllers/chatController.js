import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1460611",
  key: "32177490e7bcb319718e",
  secret: "f231f43b57bcb680f504",
  cluster: "eu",
  useTLS: true,
});

export const messages = async (req, res) => {
  await pusher.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message,
  });

  res.json([]);
};

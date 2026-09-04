export async function sendInviteEmail({
  to,
  tripName,
  inviteLink
} = {}) {

  console.log(
    "Invite email placeholder:",
    {
      to,
      tripName,
      inviteLink
    }
  );


  return {
    success: true,

    message:
      "Email service placeholder executed"
  };

}
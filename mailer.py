def send_simple_message():
    return requests.post(
        "https://api.mailgun.net/v3/sandbox91a80e6fe2a34e038f3e5d388da3aee5.mailgun.org/messages",
        auth=("api", "key-880539a823119df18cc7b0c2ed962134"),
        data={"from": "Mailgun Sandbox <postmaster@sandbox91a80e6fe2a34e038f3e5d388da3aee5.mailgun.org>",
              "to": "eve <evejweinberg@gmail.com>",
              "subject": "Hello eve",
              "text": "Congratulations eve, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."})

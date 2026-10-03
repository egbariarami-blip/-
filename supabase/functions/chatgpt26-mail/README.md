Edge function `chatgpt26-mail` (verify_jwt off; it checks the admin password itself) sends the
admin dashboard's emails through the Google Apps Script web app in `apps-script/Code.gs`, which
sends from the owner's Gmail. The script URL and shared secret are stored in
`public.chatgpt26_mail_config` (RLS on, no policies, so only the service role can read it).

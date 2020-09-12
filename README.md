# Gnice

Gnice is a set of Google Apps Scripts which aim to replicate [Hey](https://hey.com/)'s core functionality in Gmail.

## Q & A

> Why? 

I'm not really sure. It felt like a good idea early this afternoon before I knew about Google Apps Script.
Hey has a nice email model, but all of its clients are dire. They're slow. The hotkeys are annoying to remap. Search is terrible.

> Does it work?

Yep.

> Is it good?

Passable. Your emails are delayed by a minute because Google doesn't provide hooks to run on email received.

> *How* does it work?

Hilariously.

You set up a filter which makes all email skip the inbox and adds a 'processing' filter. You set up the script at https://script.google.com.

#### Reading
Inbox & Gmail labels as inboxes:
Important stuff (your Hey 'Imbox') into your inbox. Gmail labels as secondary inboxes.
'to_screen' for senders you've yet to categorize, your regular inbox for regular mail. 'paper_trail' and 'feed' for your receipts-and-whatnot and your subscriptions respectively.

#### Setting filters
Gmail labels as commands:
Each of the inbox types has a '@-type' label which you assign to teach it to categorize the sender.

#### Backend
It uses your Google Drive as a key value store.
It puts a file named with the sender's address in a folder to inform future filtering.

#### Updates
Google Apps Scripts can be run by triggers. There's no email trigger. It can run once per minute.

> Uh. Should I try it?

How much do you want to battle Google Apps Script?

> Why do you keep talking about Googel Apps Script?

Because it's steaming hot fetid garbage. It's a flavour of javascript that's stuck in an inexplicable place between 2008 and 2020. It gives you some ES6 stuff for shits and giggles because it's running on V8, but then it kicks you in the teeth by not exposing module syntax, having you code and debug in a web-ide that neither properly shows logs nor consistently allows resuming your debug breakpoints. Oh and don't even start thinking about importing anything.
Then it makes you use `.gs` files as a final kick in the teeth.

> Hey is trying to save the world from Google. Why would you keep using Gmail when ddh is welcoming you in to his warm, loving, safe, and privacy concious embrace?

Hey, IDK. 


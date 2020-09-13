# Gnice

Gnice is a set of Google Apps Scripts which aim to replicate [Hey](https://hey.com/)'s core functionality in Gmail.

## Q & A


Why? Hey is trying to save the world from Google. Why would you keep using Gmail when dhh is welcoming you in to his warm, loving, safe, and privacy concious embrace at the entirely reasonable cost of $99/year?

> Hey, man, IDK. 
> 
> 1. It felt like a good idea early this afternoon before I knew about Google Apps Script.
> 2. I'd prefer not to be using Gmail too. Basecamp's a legit company and I'm happily shelling out for a (sweet, sweet) adamz@ email.
> 3. I use Gmail already for work accounts.
> 4. Hey [won't yet support](https://hey.com/faqs/#can-i-use-my-own-custom-domain-with-hey) my (sweet, sweet) @zethrae.us domain so I'm stuck on Gmail for my primary email address.
> 5. I'm grandfathered into the [G Suite legacy free edition](https://support.google.com/a/answer/2855120?hl=en) because my life apparently peaked when I was a 18-year-5-month-and-24-day old anxiously awaiting my A-level results.
> 6. Hey's clients are *dire*. Slow. AFAICT, non-cacheing. Annoying hotkeys to relearn. Search is legitimately terrible.
> 7. Hey is *explicitly* making an email service that doesn't support existing standard email protocols. You can't bring your own client and you'll never be able to. No other major email provider does this.
> 8. Nevertheless, Hey's email model is *excellent*. Email addresses should be whitelisted. Lots of email should be relegated to secondary inboxes. Time and attention are precious.

Does it work?

> Yep.

Is it good?

> Passable. Your emails are delayed by a minute because Google doesn't provide hooks to run on email received.

*How* does it work?

> Hilariously.
> 
> You set up a filter which makes all email skip the inbox and adds a 'processing' filter. You set up the script at https://script.google.com.
>
> #### Reading
> Inbox & Gmail labels as inboxes:
> Important stuff (your Hey 'Imbox') into your inbox. Gmail labels as secondary inboxes.
> 'to_screen' for senders you've yet to categorize, your regular inbox for regular mail. 'paper_trail' and 'feed' for your receipts-and-whatnot and your subscriptions respectively.

> #### Setting filters
> Gmail labels as commands:
> Each of the inbox types has a '@-type' label which you assign to teach it to categorize the sender.

> #### Backend
> It uses your Google Drive as a key value store.
> It puts a file named with the sender's address in a folder to inform future filtering.

> #### Updates
> Google Apps Scripts can be run by triggers. There's no email trigger. It can run once per minute based on a timer trigger.

Uh. Should I try it?

> How much do you want to battle Google Apps Script?

Why do you keep talking about Googel Apps Script?

> Because it's steaming hot fetid garbage. It's a flavour of javascript that's stuck in an inexplicable place between 2008 and 2020. It gives you some ES6 stuff for shits and giggles because it's running on V8, but then it kicks you in the teeth by not exposing module syntax, having you code and debug in a web-ide that neither properly shows logs nor consistently allows resuming your debug breakpoints. Oh and don't even start thinking about importing anything.
> Then it makes you use `.gs` files as a final kick in the teeth.

Will it scale?

> Uh. [Nope](https://developers.google.com/apps-script/guides/services/quotas).

> For free google accounts:
> 
> * 250 docs created per day == max 250 *new* email addresses screenable / day.
> * 90 min of script runtime / day == (at an approximate rate of 1.5s / email) 3600 emails / day.

Should the script be using your contacts to mark filtering instead of using Drive as a key value store?

> Dear Mr/Ms Smartypants,
> 
> That question sure doesn't look like a pull request.
> 
> Yours faithfully,
>
> –Adam

Should the script maybe *not* make 'action' labels and instead look for threads still marked as 'processing' but also marked as one of the regular lables?

> Dear Mr/Ms Smartypants,
> 
> That question sure doesn't look like a pull request.
> 
> Yours faithfully,
> 
> –Adam

Should the script maybe mark an email with a label when it causes an Apps Script error so it can avoid parsing it in future and just fail the same way forever?

> Dear Mr/Ms Smartypants,
> 
> That question sure doesn't look like a pull request.
> 
> Yours faithfully,
> 
> –Adam

Could this ramshackle set of scripts make me lose my emails?

> Probably not. It's only touching email labels right now.

Could this ramshackle set of scripts make me miss my emails?

> Solidly yes. For one, that's the point. Your emails are filtered so you don't waste time on crap.
> 
> Secondly, the filters are on email addresses in the 'From' field, and in theory you could absolutely filter based on an email's 'From' and later get an important on from the same 'From'.
> 
> Thirdly, look at the code. It's medicore. It could be mining bitcoin for all I know.



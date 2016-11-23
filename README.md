# User information app  Web Server + AJAX Server // Realised in 10 days

___PART 1___

Create a Node.js application that is the beginning of a user management system. Your users are all saved in a "users.json" file, and you can currently do the following:
- search for users
- add new new users to your users file.
- get your starter file here: users.jsonAfficher dans une nouvelle fenêtre

___PART 2 : AJAX Server____

Starting with your previous website, create a new branch to preserve the old site.
Your site has a form on it that acts like a search bar. When someone types into the search bar, it should retrieve a list of matching users and list them by name on the same page, similar to how the search bars on airbnb.com or hipmunk.com function.
Once the user submits the search bar, it should exhibit the same behavior as the previous assignment, i.e. display a new page with the search results.

Part 1: Autocomplete
Modify your form so that every time the user enters a key, it makes an AJAX call that populates the search results.
Do this work in a git branch called "autocomplete". Then, merge this branch into master with a pull request.

Part 2: Bandwidth optimization
Modify your form again so that AJAX requests happen at most once every 300 milliseconds.
Do this work in a git branch called "bandwidth-optimization". Then, merge this branch into master with a pull request.


---
title: Going Static
template: article.jade
date: 2012.10.31
category: notes
summary: I've been looking for a system that could allow me to write a post on my phone, using Markdown
hero_image: /assets/images/blog/artimg-goingstatic.jpg
---

My site's been in its current form now, for around 6 months. Since it's inception I've moved countries and as a result, no longer have a desktop machine; in my spare time I usually stay connected through one of 3 i-devices, or a low-spec laptop.

To put a post together on my site requires a fair bit of work, and at the very least I need to be on the laptop to publish a post, as I need to do so through the Expression Engine Control Panel.

This isn't ideal; I haven't published anything since being in Australia. I've been looking for an alternative system that would allow me to write a post on my phone, using Markdown on IA Writer, or Evernote.

Jekyll was too developer-y for me, and I didn't have the stones (or patience) to use some funky Python CMS...

##Enter Statamic

I found the answer by following a Twitter thread between two friends (and old colleagues) of mine. They linked to Statamic, which is a text-only CMS, using nothing but php and a bit of YAML to string a site together. Posts can be written in Markdown and the admin panel is optional (and mobile friendly).

This was too good to pass-up, so I've installed it here on this subdomain and will be building out a new site here (and along the way making some style improvements).

I've stored the site as a git repo in bitbucket and can deploy revisions via the terminal using the Dandelion Ruby Gem, which is way awesome!

I'll post any useful insights I find and before I forget; thanks Simon [(@thoughtfulweb)]("http://twitter.com/thoughtfulweb") and Kat [(@katkerber)!]("http://twitter.com/katkerber")

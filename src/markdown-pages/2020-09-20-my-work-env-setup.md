---
path: "/blog/my-work-env-setup"
date: "2020-09-20"
title: "My work environment setup"
tags: []
---

## Hardware

- Macbook Pro 13-inch 2018: Nowadays fast SSD and at least 16 gigabytes of
memory is the lowest bar for a development box
- Normal mouse and normal keyboard: I'm not even using mechanic keyboard, might
due to their noises. I'm still using a ten-year old BenQ so-called X structure
keyboard. Developers don't have to type a lot at all.
- 27-inch display: nothing special
- Laptop stand: A must-have
- Stand desk: not yet. I might give an electronic multi-stage desk a go.

## Software

- Operation system: As a Java developer most of the time (Clojure at last
project), I don't have to bear with Windows though I heard about its improving
terminal experience lately. I quite enjoy the experience under Ubuntu, especially
the huge performance gain in Docker. The change of shortcuts is the top blocker
to my turning away from Macbook.
- IntelliJ Ultimate: As a previous ten-year user of Eclipse, I vouch for IntelliJ
with my whole heart. Its support of refactoring and TDD is the deal breaker. My
current company has paid for it but I'm also willing to take from my own pocket.
- iTerm2: Great terminal with tabs and view split. Though on linux it's easy to find
alternatives without some advanced features I don't use. 
- My homebrew list: Sorry for the transient packages
```
ack		gettext		jq		nettle		perl		stoken
adns		git		krb5		node		pinentry	tfenv
aliyun-cli	git-delta	leiningen	npth		pkg-config	unbound
awscli		git-lfs		oniguruma	postgresql	vim
bdw-gc		gmp		libyaml		openconnect	protobuf	wget
clojure		gnutls		lua		openjdk		python@3.8	xz
curl		gradle		maven		openssl@1.1	readline	yarn
exercism	guile		-error	mysql		p11-kit		rlwrap		z
fzf		hub		libidn2		n		ruby		zsh
gdbm		icu4c		ncurses		
```

## Terminal setup

- Zshell
- Oh-my-zsh
- fzf: A great improvement to command history
- z: Excellent directory jumper
- spaceship-prompt: Optional
- Sdkman
- Useful aliases apart from those coming with plugins of oh-my-zsh
```
➜ cat ~/.oh-my-zsh/custom/alias.zsh
alias dprune='docker stop $(docker ps -a -q) || docker system prune -af || docker volume prune -f'
alias dclean='docker rm -f $(docker container ls -aq) || docker volume prune -f'
alias brewu="brew upgrade; brew upgrade --cask; brew cleanup;"
alias grsb="git remote set-branches --add origin"
```

## Tips

Get yourself familiar with common shortcuts in those applications.

---
path: "/blog/approaches-to-installing-ubuntu-along-with-windows-10.md"
date: "2020-02-07"
title: "Approaches to Installing Ubuntu along with Windows 10"
tags: ["Tips"]
---
## Why
I've got a Intel Skull Canyon mini PC box at home with Windows 10 installed. Most of time it's only used for watching online stream on projector and as light gaming pc for my wife for Planet Zoo.

Still MacBook is my main working platform but I am not necessarily binded to it. All I need is an Operation System having fully functionable shell terminal and a lively ecosystem of softwares. Windows turns out not a good fit for me in work scenario so Ubuntu is my next try in list.

## Steps
### Make room for Ubuntu
The built-in disk management of windows won't allow me to shrink existing partition too much even there's free space. I used to defrag it to solve the problem, but now it's a SSD so I'm not sure that still applies.

I used [Macroit's Partition Expert](https://macrorit.com/partition-magic-manager/partition-expert-download.html). The free version worked out really good. And no surprise happened for me. But if you do have some important data on your disk, backup first.

### Burn! ISO!
A sacrifice of USB disk is required in this step.

My experience in this part was mediocre. Please try a different tools mentioned in the official tutorial. (https://askubuntu.com/questions/52963/how-do-i-set-windows-to-boot-as-the-default-in-the-boot-loader)

### Reboot and Install
Follow the boot device hints of BIOS. It's surprisingly easy to follow the steps of Ubuntu install. May need to stop and think about the choice of partition to install. 

## After Ubuntu install
1. Homebrew works in Ubuntu, so I use it to keep my habits in OSX.
2. zsh/oh-my-zsh. After `chsh` a re-login is required. Maybe that's due to the change made to .profile instead of .bash. (https://www.howtoforge.com/tutorial/how-to-setup-zsh-and-oh-my-zsh-on-linux/)
3. Some tools for terminal I fancy a lot
- https://github.com/rupa/z
- https://github.com/sindresorhus/pure

## References
https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-windows#2-requirements

https://askubuntu.com/questions/52963/how-do-i-set-windows-to-boot-as-the-default-in-the-boot-loader
---
path: "/blog/approaches-to-installing-ubuntu-along-with-windows-10.md"
date: "2020-02-07"
title: "Approaches to Installing Ubuntu along with Windows 10"
tags: ["Tips"]
---
## Why

I've got a Intel Skull Canyon mini PC box at home with Windows 10 installed. Most of time it's only used for watching online stream on projector and as light gaming pc for my wife for Planet Zoo.

Still MacBook is my main working platform but I am not necessarily binded to it. All I need is an Operation System having fully functionable shell terminal and a lively ecosystem of softwares. Windows turns out not a good fit for me in work scenario so Ubuntu is my next try in list.

I've updated to Ubuntu 20.04.1 LTS. So far so good. 

## Steps

### Make room for Ubuntu

The built-in disk management of windows won't allow me to shrink existing partition too much even there's free space. I used to defrag it to solve the problem, but now it's a SSD so I'm not sure that still applies.

I used [Macroit's Partition Expert](https://macrorit.com/partition-magic-manager/partition-expert-download.html). The free version worked out really good. And no surprise happened for me. But if you do have some important data on your disk, backup first.

### Burn! ISO

A sacrifice of USB disk is required in this step.

Following the recommended burning tool in the official tutorial works well. (<https://askubuntu.com/questions/52963/how-do-i-set-windows-to-boot-as-the-default-in-the-boot-loader)>

### Reboot and Install

Follow the boot device hints of BIOS. It's surprisingly easy to follow the steps of Ubuntu install. May need to stop and think about the choice of partition to install.

## After Ubuntu install

1. Homebrew works in Ubuntu, so I use it to keep my habits in OSX. Follow the steps on the website. Manual installation through apt is required for both curl and git.
2. zsh/oh-my-zsh. It might makes subsequent installation of plugins through Homebrew easier if zsh is installed from Homebrew as well. Then, sudo edit `/etc/shells` to add path to brewed zsh (at $HOMEBREW_PREFIX/bin/zsh). Then `chsh -s` the shell and a re-login is required. Maybe that's due to the change made to .profile instead of .bash. 
3. Some tools for terminal I fancy a lot

- <https://github.com/rupa/z>
- <https://github.com/sindresorhus/pure>

## Install git env including GPG

### Prerequisite

- Git already installed, I prefer to get the homebrew version of which updates are more frequent
- GPG keys already generated and added to Github
- I protected my email address on GitHub so during the setup I'm referring to the public fuzzy one
- I also installed hub as a wrapper for github

### Basic setup

```
git config --global user.email "615526+sherlockq@users.noreply.github.com"                                                    
git config --global user.name "Zhiqiang (Sherlock) Qiao"                                                                      
git config --global hub.protocol https                                                                                        
```

### Setup gpg

```
gpg --import [key-path]
gpg --list-secret-keys 
```
Copy the SHA keys from last command and put that into git command

```
git config --global commit.gpgsign true                                                                                       
git config --global user.signingkey 2A18BE2F0EE09C89ACBB88D986C0C86BB4675EF3                         
```

Now we should be able to signed commit

### Keep credential in Ubuntu's password manager

I prefer to use HTTPS protocol to access GitHub by default, thus instead of SSH keys a token was generated and used as password.

That requires a credential store to avoid repeat input. I used Ubuntu's owne which rebranded from Seahorse. It's a GUI could open by command `seahorse`. Libsecret is also required to act as an bridge.

```
# install make from brew if necessary
cd /usr/share/doc/git/contrib/credential/libsecret/
sudo apt-get install libsecret-1-0 libsecret-1-dev
sudo make

git config --global credential.helper /usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

Then we could simply remove libsecret-1-dev and `sudo apt-get autoremove` to clean up.

After these steps we should only input passwords once.

### Docker Credential helper

We could do the same thing for docker to store credential in Seahorse.

Download docker-credential-secretservice release executable from here https://github.com/docker/docker-credential-helpers/releases

Extract the single file `docker-credential-secretservice` and copy that to a place within PATH, I put
it in `/usr/local/bin`. Then give it executable permission:
`sudo chmod +x /usr/local/bin/docker-credential-secretservice`

Then edit the docker config json at your home folder, and add settings like this:
```
# cat ~/.docker/config.json 
{
	"credsStore": "secretservice"
}
```
## References

<https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-windows#2-requirements>

<https://askubuntu.com/questions/52963/how-do-i-set-windows-to-boot-as-the-default-in-the-boot-loader>

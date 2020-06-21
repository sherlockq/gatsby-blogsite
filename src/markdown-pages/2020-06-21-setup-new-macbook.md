---
path: "/blog/reinstall-macbook-os"
date: "2020-06-21"
title: "How I reinstall macbook"
tags: ["Tips"]
---
## Why

I've never actually cleaned my Macbook system since my first use of it even the current Macbook has been my third one. The migration experience has always been perfect, and I don't really feel any slowness due to the growing system.   

Somehow you could still notice the disappearing disk space. The growing files in home directory and the left over due to changing utilities are reminding you that maybe it's the time as well.
 
## Preparation with backups

If you don't want to rely on the stock migration because it'll keep all your files and settings, you have to make a backup on your own.

The simple way is to rely on the time machine backup if you have. It's possible to pick any files you want from that.

Or just be safe. Here's a list of backup I had:
- Home directory. At least all those hidden files with your shell configuration.
- Credentials. `~/.ssh`, `~/.aws` etc.
- OSX Keychains `~/Library/Keychains`. I didn't really restore this, but just in case.  
- GPG Keychain. Use GPG Keychain GUI from GPG Suite to backup your private keys or follow this instruction: https://makandracards.com/makandra-orga/37763-gpg-extract-private-key-and-import-on-different-machine
- Homebrew list `brew list`

If you have enough space in external disk or on your builtin SSD, I strongly suggest copying the whole home directory excluding some obvious unwanted files.

## ADFS Volume as the storage of backup

On macbook there's a dynamic partition could be easily used as a safety harbor for backups. Right click in `Disk Utility` and select `Add ADFS Volume`, and you will have a partition won't be lost during your reinstall.

## Reinstall macbook

Follow the link to have an overview of steps: https://support.apple.com/en-gb/guide/mac-help/mchlp1599/mac

The difference for a clean install is that you have to remove the existing system before installing. It could also be done through the same start up utility. The existing system is usually named as "Macintosh HD".
    
## Restore and setup

To me that basically means:
- Cloud account
- Chrome and google account
- Mouse/Trackpad/Keyboard settings 
- Terminal settings
- Homebrew
- Shell utitlies and development tools
  - ZShell
  - Oh-My-Zsh
  - Prompt plugin, I tried with 'spaceship' this time. 
  - z (the folder jumper)
  - fzf
  - SDKMan
  - Git settings
  
## Some findings during the setup

### Best timing to revoke your long-lived tokens

When was your last time reset your tokens for AWS, Github etc? Now it's the time. 

### SDKMan won't work for `/usr/libexec/java_home`

Some GUI applications won't find installed JDK from SDKMan. If you run `/usr/libexec/java_home -v` in terminal you will get a "Unable to find any JVMs matching version (null)" errors. It's said that SDKMan works in the user space level so won't touch the system level of `java_home`.

The quick fix is to brew install a global keg-only jdk, which I chose the most application friendly openjdk, and create a hardlink according to the instructions from Homebrew:
`sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk`

Even I still use SDKMan to manage my development JDKs, this homebrew version won't add any trouble to update while solved my problem.
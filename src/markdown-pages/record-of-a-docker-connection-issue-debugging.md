---
path: "/blog/record-of-a-docker-connection-issue-debugging.md"
date: "2020-02-16"
title: "The story of debugging a failure of apt-update in Docker container"
tags: ["Tips"]
---
## Summary
This blog is about how I encounter an unexpected issue while maintaining the AWS deployed machine. And how I found out
the true culprit and solve it in an acceptable way for now. Also the joining of my colleagues eased the pain a lot.

**Brief take away:** Use immutable/version-controlled/code-as-configuration infrastructure. 

## Issue
All started with my attempt to use Docker with Jenkins Pipeline hosted on an AWS EC2 instance.
It's an even longer story, even more frustrating, but I'll leave that for another blog.

So I wrote a simplest Dockerfile and Jenkinsfile, pushed to Github, created the Jenkins project. There's not much in the 
Dockerfile:
``` dockerfile
FROM clojure:openjdk-8-lein

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
# NPM
RUN apt-get install -y nodejs
...
```

And in Jenkinsfile just to test if this dockerfile could be built.
``` groovy
pipeline {
    agent {
        dockerfile {
            dir 'scripts'
            filename 'Dockerfile.ci'
        }
    }
...
}
```

Before actually running in the pipeline, I tried building the Dockerfile locally, all went smoothly. It would a 
bit trickier to test the Jenkins file locally due to usage of Docker. Gladly the feedback circle of running it directly
on pipeline was swift enough.

And so it comes
```
Sending build context to Docker daemon  18.43kB

Step 1/4 : FROM clojure:openjdk-8-lein
 ---> 64f1da2a6932
Step 2/4 : RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
 ---> Running in 263baa2174c3

## Installing the NodeSource Node.js 12.x repo...


## Populating apt-get cache...

+ apt-get update
Ign:1 http://security.debian.org/debian-security stretch/updates InRelease
Ign:2 http://security.debian.org/debian-security stretch/updates Release
Ign:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
Ign:4 http://security.debian.org/debian-security stretch/updates/main all Packages
Ign:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
Ign:4 http://security.debian.org/debian-security stretch/updates/main all Packages
Ign:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
Ign:4 http://security.debian.org/debian-security stretch/updates/main all Packages
Ign:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
Ign:4 http://security.debian.org/debian-security stretch/updates/main all Packages
Ign:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
Ign:4 http://security.debian.org/debian-security stretch/updates/main all Packages
Err:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages
  403  Forbidden
Ign:4 http://security.debian.org/debian-security stretch/updates/main all Packages
Ign:5 http://deb.debian.org/debian stretch InRelease
Ign:6 http://deb.debian.org/debian stretch-updates InRelease
Ign:7 http://deb.debian.org/debian stretch Release
Ign:8 http://deb.debian.org/debian stretch-updates Release
Ign:9 http://deb.debian.org/debian stretch/main amd64 Packages
Ign:10 http://deb.debian.org/debian stretch/main all Packages
Ign:11 http://deb.debian.org/debian stretch-updates/main amd64 Packages
Ign:12 http://deb.debian.org/debian stretch-updates/main all Packages
Ign:9 http://deb.debian.org/debian stretch/main amd64 Packages
Ign:10 http://deb.debian.org/debian stretch/main all Packages
Ign:11 http://deb.debian.org/debian stretch-updates/main amd64 Packages
Ign:12 http://deb.debian.org/debian stretch-updates/main all Packages
Ign:9 http://deb.debian.org/debian stretch/main amd64 Packages
Ign:10 http://deb.debian.org/debian stretch/main all Packages
Ign:11 http://deb.debian.org/debian stretch-updates/main amd64 Packages
Ign:12 http://deb.debian.org/debian stretch-updates/main all Packages
Ign:9 http://deb.debian.org/debian stretch/main amd64 Packages
Ign:10 http://deb.debian.org/debian stretch/main all Packages
Ign:11 http://deb.debian.org/debian stretch-updates/main amd64 Packages
Ign:12 http://deb.debian.org/debian stretch-updates/main all Packages
Ign:9 http://deb.debian.org/debian stretch/main amd64 Packages
Ign:10 http://deb.debian.org/debian stretch/main all Packages
Ign:11 http://deb.debian.org/debian stretch-updates/main amd64 Packages
Ign:12 http://deb.debian.org/debian stretch-updates/main all Packages
Err:9 http://deb.debian.org/debian stretch/main amd64 Packages
  403  Forbidden
Ign:10 http://deb.debian.org/debian stretch/main all Packages
Err:11 http://deb.debian.org/debian stretch-updates/main amd64 Packages
  403  Forbidden
Ign:12 http://deb.debian.org/debian stretch-updates/main all Packages
Reading package lists...
[91mW[0m[91m: [0m[91mThe repository 'http://security.debian.org/debian-security stretch/updates Release' does not have a Release file.[0m[91m
[0m[91mW[0m[91m: [0m[91mThe repository 'http://deb.debian.org/debian stretch Release' does not have a Release file.[0m[91m
[0m[91mW[0m[91m: [0m[91mThe repository 'http://deb.debian.org/debian stretch-updates Release' does not have a Release file.[0m[91m
[0m[91mE[0m[91m: [0m[91mFailed to fetch http://security.debian.org/debian-security/dists/stretch/updates/main/binary-amd64/Packages  403  Forbidden[0m[91m
[0m[91mE[0m[91m: [0m[91mFailed to fetch http://deb.debian.org/debian/dists/stretch/main/binary-amd64/Packages  403  Forbidden[0m[91m
[0m[91mE[0m[91m: [0m[91mFailed to fetch http://deb.debian.org/debian/dists/stretch-updates/main/binary-amd64/Packages  403  Forbidden[0m[91m
[0m[91mE[0m[91m: [0m[91mSome index files failed to download. They have been ignored, or old ones used instead.[0m[91m
[0mError executing command, exiting
The command '/bin/sh -c curl -sL https://deb.nodesource.com/setup_12.x | bash -' returned a non-zero code: 1

```
 
BTW, it's what success looks like.
```
❯ docker run -it --rm clojure:openjdk-8-lein bash
root@b2a964293325:/tmp# apt update
Get:1 http://security.debian.org/debian-security stretch/updates InRelease [94.3 kB]
Ign:2 http://deb.debian.org/debian stretch InRelease 
Get:3 http://deb.debian.org/debian stretch-updates InRelease [91.0 kB]
Get:4 http://deb.debian.org/debian stretch Release [118 kB]      
Get:5 http://deb.debian.org/debian stretch Release.gpg [2410 B]
Get:6 http://security.debian.org/debian-security stretch/updates/main amd64 Packages [517 kB]
Get:7 http://deb.debian.org/debian stretch-updates/main amd64 Packages [27.9 kB]
Get:8 http://deb.debian.org/debian stretch/main amd64 Packages [7083 kB]                 
Fetched 7934 kB in 3s (2577 kB/s)                     
Reading package lists... Done
Building dependency tree       
Reading state information... Done
7 packages can be upgraded. Run 'apt list --upgradable' to see them.

```

## Story
It was already 6pm. 
### First thought
ISN'T DOCKER SUPPOSED TO BE THE SAME EVERYWHERE?

### Double confirm the checksum of base image
So maybe the base image is different, due to prior caching on the machine?
```
Step 1/4 : FROM clojure:openjdk-8-lein
 ---> 64f1da2a6932
```
It's the same as what I have locally. 

### Log on the machine to run docker build
Luckily I had the credential to the EC2 instance. So I found the workspace of that jenkins project and the Dockerfile,
`docker build`. Same errors.

### Into the shell of base image and try running apt update
`docker run -it --rm clojure:openjdk-8-lein bash` -> `apt update`

No magic.

### Improvise time
- Visit the url mentioned in the error message through my local browser - 404, really mislead me for quite a while
- Different CPU leads to different repository? Maybe, yet amd64 was mentioned in both envs.
- Debian's CDN issue? Same ip was resolved.
- Some else I couldn't remember now

### Strange curl result
During all that time, I still thought it's due to the missing of some Debian packages.

Somehow I executed `curl http://deb.debian.org` in docker:
```
[ec2-user@ip-xxx ~]$ curl http://deb.debian.org
<html><head><meta http-equiv='refresh' content='1;url=/securityRealm/commenceLogin?from=%2F'/><script>window.location.replace('/securityRealm/commenceLogin?from=%2F');</script></head><body style='background-color:white; color:white;'>


Authentication required
<!--
You are authenticated as: anonymous
Groups that you are in:
  
Permission you need to have (but didn't): hudson.model.Hudson.Read
 ... which is implied by: hudson.security.Permission.GenericRead
 ... which is implied by: hudson.model.Hudson.Administer
-->
</body></html> 

```

And on the machine, it's a response looking good. So it meant somehow the HTTP response inside the docker and outside
is different.

### Arnold joined. "IT'S JENKINS BEHIND THAT"
Arnold said, husdon was an alias for Jenkins. So that response was from Jenkins.

Until then did I realize it had nothing to with any specific Debian package or the repo at all.

### Some HTTP tests 
All curl requests on the machine is fine. And all curl requests in the docker is broken with the 403 response.
- Different base image? Same
- DNS? ping/nslookup resolved to same ip
- Turn off Jenkins. `Connection timeout`

### HTTPS maybe?
All good!

### HTTP not on port 80
All good!

### Sub Summary
So we believed there must be something put Jenkins in the middle of all requests to 80 port.

### Searching 
Here're all we could think of at the moment. Some were from the existing knowledge, some were from googling.
- HTTP_PROXY environment variable. Nowhere, in or out docker.
- Docker config. Spent quite some time to figure out where they may be.
- `docker info` not helpful
- `ps aux | grep docker`, `ps aux | grep jenkins` Nope.
- Look into the start parameters of Docker and Jenkins.
- Go through environment variables repeatedly. In and out.
- Docker client proxy argument. Not used.
- Docker engine proxy argument. No such thing.

### Mash joined, "Should be the routes", and left
- `netstat -rn`
- Other commands from googling.
 
Something about Docker there. But nothing about port 80.

### Arnold noticed docker network, "Give it a go"
By default the container was bound to `bridged` network. And there's also a network called `host`. But my understanding
of `host` network was that only traffics between container and host machine are allowed. So I explained and refused at first.

I was glad I didn't insist longer than 10 seconds because what else choices did I have?
And it worked!

But it also means, we have to change the network binding in `dockerfile` directive in Jenkinsfile. Or change the default 
settings of docker engine. And nobody mentioned that practice on the network. It couldn't be right.

It was also quite late. We just called it a day and went home. On my way home, I studied the differences between host 
and bridged. It turned out host mode would share the listening ports on the host machine with container, which may be a
security breach and also concerns of isolation between containers. 

The official docker article also mentioned enabling forwarding in kernel and configure IpTables to enable forwarding in
Linux. I just knew by default bridged network couldn't visit networks outside host, so someone must have enabled that while
installing Docker. And more importantly, the name `iptables` rang a bell.

### Next day
I had no real knowledge of iptables at that moment. I did touch it almost two decades before during my high school.
It was painful.

So I googled it, as always, and just ran through all the commands mentioned on some random pages, as long as they had no
side effects (show/list/etc..)

And look at that bastard!!
```
[root@ip-xxx /]# iptables -nvL -t nat
Chain PREROUTING (policy ACCEPT 209K packets, 11M bytes)
 pkts bytes target     prot opt in     out     source               destination         
 706K   42M REDIRECT   tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:80 redir ports 8080

```

### Fix it
All the rest was easy part. I couldn't find who did that. But I could guest what's that for. Thanks Andrei for pairing
with me on them.
- Check AWS Route 53, ELB settings, to understand the port forwarding mechanism
- Find way to backup iptables rule. `iptables-save`
- Change target group port mapping in AWS.
- Remove iptable rule by command.
- Problem solved! And Jenkins was accessible all the same.
- Remove iptable rule from the startup file `/etc/sysconfig/iptables` to persist change over reboot. But it may not be
necessary, iptables-save seems like saving it automatically
- Restart to confirm.

And the docker couldn't start up after that. But it's another story.....  :facepalm: <-- TODO: I'll fix the emoji later

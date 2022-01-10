---
path: "/blog/systemd-dropin-allows-remote-docker-host"
date: "2022-01-10"
title: "Using systemd drop-in configuration to allow remote docker host"
tags: ["Vue"]
---

## Summary

It's supposed to be an easy task, but the technical loophole at every step make it harder than
expected.

The problem I was trying to solve is to allow myself working on a M1 macbook with some x86 only
docker images running on a Ubuntu box at home, so could still have a perfect local experience
without toggling between machines.

## Final solution

```shell
> sudo mkdir -p /etc/systemd/system/docker.service.d
> sudo vi /etc/systemd/system/docker.service.d/host.conf

[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock

> sudo systemctl daemon-reload
> sudo systemctl restart docker
> sudo systemctl show --property=ExecStart docker
```

The folder name is corresponding to the service name under `/lib/systemd/system/docker.service`,
which is called a [drop-in](https://wiki.archlinux.org/title/systemd#Drop-in_files) folder. The file
name could be anything ending with `.conf`. The first assignment in the file is called "clear",
which is necessary if you'd like to override an existing property.

And that's it on the host.

For the docker client, this env variable is all you
need: `export DOCKER_HOST=tcp://your-docker-host:2375`

## Unfortunate Steps

### Daemon.json won't work

https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file

It says
> You cannot set options in daemon.json that have already been set on daemon startup as a flag.
> On systems that use systemd to start the Docker daemon, -H is already set, so you cannot use
> the hosts key in daemon.json to add listening addresses. See
> https://docs.docker.com/engine/admin/systemd/#custom-docker-daemon-options for how to accomplish
> this task with a systemd drop-in file.

### Changing systemd default service work, but not for too long

I'm never good at Systemd. I find this file `/lib/systemd/system/docker.service`, and add a listen
port to the ExecStart line, which works. But once the docker is updated, that file will be replaced.
After two occurrences of this, I decided to move on.

## Extra gift for test container users

```shell
➜ cat ~/.testcontainers.properties
# not sure the first line is necessary, it was there before
docker.client.strategy=org.testcontainers.dockerclient.UnixSocketClientProviderStrategy
docker.host=tcp\://sthome-nuc\:2375
```

## References

Most of the answer is in [docker systemd](https://docs.docker.com/config/daemon/systemd/). But to
know where it is, takes a long time. Hope this blog will find you well.


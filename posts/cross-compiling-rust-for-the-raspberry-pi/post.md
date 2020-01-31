---
title: Cross Compiling Rust for the Raspberry Pi
date: "2020-1-28"
frontCover: "frontCover.png"
poster: "poster.png"
keywords: "cross compile, rust, raspberry pi, linux"
description: "Compile a Rust program on your Linux computer and run it on the Pi!"
---

# Getting Started
> If you want to automate this process with Docker, take a look at [Rust Cross](https://github.com/japaric/rust-cross)!

This guide covers how to set up your linux computer to `compile`, `upload`, and `run` a Rust binary on your Raspberry Pi. In order to do this, you'll need to:

- Download the standard library that's compatible with your Pi.
- Download the Linker for the Cortex-A Family.
- Upload & run the binary on your Pi.

Before moving on, make sure you have a Pi that's **connected to WiFi** and has **SSH enabled**.

## Install the Standard Library for your Pi
Assuming that [Rust](https://www.rust-lang.org/) is already installed, download the compatible standard library on your computer.

```bash 
# Supports Pi 0/1
rustup target add arm-unknown-linux-musleabihf
# Supports Pi 2/3/4
rustup target add armv7-unknown-linux-gnueabihf
```

## Download the GNU Toolchain
> We're installing this from source to stay distro agnostic.

Next we need to get a compatible Arm linker for Rust to compile against. Download any Toolchain version for "[AArch32 target with hard float](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-a/downloads)", unzip it, and add the binaries to your `$PATH`.

```bash
# add to your .bashrc, .zshrc, config.fish, or etc..
export PATH="$HOME/PATH_TO_YOUR_DOWNLOAD/gcc-arm-none-eabi-9-2019-q4-major/bin:$PATH"
```

## Create a Cargo Project
It's almost ready! All that's left is to create and configure a cargo project.

```bash
cargo new pi_project
mkdir pi_project/.cargo
cd ./pi_project/.cargo
touch config.toml
```

Add the following to `pi_project/.cargo/config.toml`.
```yaml
[build]

# Pi 2/3/4
[target.armv7-unknown-linux-gnueabihf]
linker = "arm-none-linux-gnueabihf-gcc"

# Pi 0/1
[target.arm-unknown-linux-musleabihf]
linker = "arm-none-linux-gnueabihf-gcc"

# (Optional) Set default target for cargo build
# target = "armv7-unknown-linux-gnueabihf"
# rustflags = ["-C", "linker=arm-none-linux-gnueabihf-gcc"]
```

## Run your Binary on the Pi
Below is a quick example workflow you can use to quickly deploy your project on a Pi.

![](/posts/cross-compiling-rust-for-the-raspberry-pi/demo.png)

```bash
PI_IP=192.168.2.161
TARGET=armv7-unknown-linux-gnueabihf

# build binary
cargo build --target $TARGET

# upload binary
sshpass -p 'raspberry' scp -r ./target/$TARGET/debug/pi_project pi@$PI_IP:/home/pi

# execute binary
sshpass -p 'raspberry' ssh pi@$PI_IP './pi_project'
```

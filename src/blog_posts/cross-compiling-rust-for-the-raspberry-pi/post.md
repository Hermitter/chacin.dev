---
slug: "/blog/cross-compiling-rust-for-the-raspberry-pi"
date: "2020-01-28"
title: "Cross Compiling Rust for the Raspberry Pi"
featuredImage: "frontCover.png"
previewCardImage: "poster.png"
---

# Getting Started

> If you want to automate this process with Docker, take a look at [cross](https://github.com/rust-embedded/cross)!

This guide covers how to set up your linux computer to `compile`, `upload`, and `run` a Rust binary on your Raspberry Pi. In order to do this, you'll need to:

- Download the standard library that's compatible with your Pi.
- Download the Linker for the Cortex-A Family.
- Upload & run the binary on your Pi.

Before moving on, make sure you have a Pi that's **connected to WiFi** and has **SSH enabled**.

## Install the Standard Library for your Pi

Assuming that [Rust](https://www.rust-lang.org/) is already installed, download the compatible standard library on your computer.

```shell{outputLines: 1,3}{promptUser: carlos}{promptHost: computer}
# Supports Pi 0/1
rustup target add arm-unknown-linux-gnueabihf
# Supports Pi 2/3/4
rustup target add armv7-unknown-linux-gnueabihf
```

## Download the GNU Toolchain

> We're installing this from source to stay distro agnostic.

Next we need to get a compatible Arm linker for Rust to compile against. Download any **Linux** Toolchain version for the desired target.

> You may have to search through previous releases to find what you want.

- [GNU Toolchain Downloads](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-a/downloads)
  - `Pi 0/1`: **AArch32 target with hard float (arm-linux-gnueabihf)**
  - `Pi 2/3/4`: **AArch32 target with hard float (arm-none-linux-gnueabihf)**

Unzip it, and add the binaries to your `$PATH`.

```bash
# Add to your .bashrc, .zshrc, config.fish, .profile, etc..
# Pi 0/1 Example: export PATH="$HOME/Documents/gcc-arm-8.3-2019.03-x86_64-arm-linux-gnueabihf/bin:$PATH"
# Pi 2/3/4 Example: export PATH="$HOME/Documents/gcc-arm-9.2-2019.12-x86_64-arm-none-linux-gnueabihf/bin:$PATH"
export PATH="$HOME/PATH_TO_YOUR_DOWNLOAD/PATH_TO_TOOLCHAIN_FOLDER/bin:$PATH"
```

## Create a Cargo Project

It's almost ready! All that's left is to create and configure a cargo project.

```shell{promptUser: carlos}{promptHost: computer}
cargo new pi_project
mkdir pi_project/.cargo
cd ./pi_project/.cargo
touch config.toml
```

Add the following to `pi_project/.cargo/config.toml`.

```toml
[build]

# Pi 0/1
[target.arm-unknown-linux-gnueabihf]
linker = "arm-linux-gnueabihf-gcc"

# Pi 2/3/4
[target.armv7-unknown-linux-gnueabihf]
linker = "arm-none-linux-gnueabihf-gcc"

# (Optional) Set default target for cargo build
# target = "armv7-unknown-linux-gnueabihf"
# rustflags = ["-C", "linker=arm-none-linux-gnueabihf-gcc"]
```

## Run your Binary on the Pi

Below is a quick example workflow you can use to quickly deploy your project on a Pi.

```shell {outputLines: 3-5,7-8,10-11}{promptUser: carlos}{promptHost: computer}
PI_IP=192.168.2.159 # Be sure to change this!
TARGET=armv7-unknown-linux-gnueabihf # Pi 2/3/4
#TARGET=arm-unknown-linux-gnueabihf # Pi 0/1

# build binary
cargo build --target $TARGET

# upload binary
sshpass -p 'raspberry' scp -r ./target/$TARGET/debug/pi_project pi@$PI_IP:/home/pi

# execute binary
sshpass -p 'raspberry' ssh pi@$PI_IP './pi_project'
```

The output should look like this.
![example output of the Rust program](./demo.png)

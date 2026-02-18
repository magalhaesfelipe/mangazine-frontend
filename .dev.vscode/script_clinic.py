#!/usr/bin/env python3
import os
import subprocess
import sys

npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"

# DIRECTORIES PATH (root, front, back)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# front_path = os.path.join(BASE_DIR, "FRONT-VITE")

# # UPDATE
# print("\n -> Updating MANGAZINE front-end\n")
# try:
#     subprocess.run(["git", "-C", front_path, "pull"], check=True)
# except subprocess.CalledProcessError:
#     print(f"ERROR: Failed to update front-end in: {front_path}")


# print("\n -> FINISHED UPDATES \n")

# INSTALL PACKAGES
# print("\n -> INSTALLING PACKAGES \n")

# for d in front_dirs:
#     full_path = os.path.join(BASE_DIR, d)

#     if not os.path.isdir(full_path):
#         print(f"Directory {full_path} does not exist. Skipping...")
#         continue

#     if not os.path.isfile(os.path.join(full_path, "package.json")):
#         print(f"Skipping {d} (no package.json found)")
#         continue

#     print(f"\nInstalling packages in {d}...\n")
#     try:
#         subprocess.run([npm_cmd, "install"], cwd=full_path, check=True)
#     except subprocess.CalledProcessError:
#         print(f"Failed to install packages in {d}")

# LAUNCH
print("\n -> Launching MANGAZINE front-end...\n")
try:
    subprocess.run([npm_cmd, "start"], cwd=BASE_DIR, check=True)
except subprocess.CalledProcessError:
    print("Failed to launch MANGAZINE front-end!")

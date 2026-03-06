@echo off
set EXPO_PACKAGER_HOSTNAME=192.168.1.5
set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.5
echo Starting VahaniQ with IP 192.168.1.5...
npx expo start --lan --clear
pause

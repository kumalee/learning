## Enable loopback visit for edge
```cmd
CheckNetIsolation LoopbackExempt -a -n=Microsoft.MicrosoftEdge_8wekyb3d8bbwe
```

## Recycle hole iis
```cmd
iisreset /restart {serverName}
```

## Recycle iis app
```cmd
PsExec.exe \\{serverName} %SystemRoot%\System32\inetsrv\appcmd recycle apppool ec-platform-ui
```

## [Enable WSL 2 support](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install)
1. Windows 10 build 18917 or higher
2. run power shell as admin
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```
3. restart computer
4. run power shell as admin
```powershell
wsl --set-version <Distro> 2
```
and make sure to replace <Distro> with the actual name of your distro. (You can find these with the command: `wsl -l`
```
// make WSL 2 your default architecture
wsl --set-default-version 2

// To verify what versions of WSL each distro is using use the following command:
// The distro that you've chosen above should now display a '2' under the 'version' column. Now that you're finished feel free to start using your WSL 2 distro!
wsl --list --verbose or wsl -l -v
```

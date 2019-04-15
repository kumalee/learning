```.gitconfig
[user]
        name = Kuma Li
        email = li.jun.kuma@gmail.com
[core]
        editor = vim
[merge]
        tool = vimdiff
[color]
        status = auto
        branch = auto
        interactive = auto
        diff = auto
        ui = auto
[alias]
        s = status
        d = diff
        b = branch
        co = checkout
        rb = rebase
        a = add
        ci = commit
        pr = pull --rebase
        logod = log --oneline --color --decorate
        logdiff = log --stat --color -p
        logtree = log --graph --oneline --color --decorate
        lg = log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s%Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
        notpr = log --oneline origin/develop..HEAD --no-merges
        w = whatchanged
        pfall = push --force --tags origin 'refs/heads/*'
        ignore = "!gi() { curl -L -s https://www.gitignore.io/api/$@ ;}; gi"
[push]
        default = current
[filter "lfs"]
        clean = git-lfs clean -- %f
        smudge = git-lfs smudge -- %f
        process = git-lfs filter-process
        required = true
[http]
        postBuffer = 1048576000
```
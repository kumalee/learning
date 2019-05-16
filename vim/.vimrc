" Specify a directory for plugins
" - For Neovim: ~/.local/share/nvim/plugged
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')

" Make sure you use single quotes

" Shorthand notation; fetches https://github.com/junegunn/vim-easy-align
" Plug 'junegunn/vim-easy-align'

" Any valid git URL is allowed
" Plug 'https://github.com/junegunn/vim-github-dashboard.git'

" Multiple Plug commands can be written in a single line using | separators
" Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'

" On-demand loading
" Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
" Plug 'tpope/vim-fireplace', { 'for': 'clojure' }

" Using a non-master branch
" Plug 'rdnetto/YCM-Generator', { 'branch': 'stable' }

" Using a tagged release; wildcard allowed (requires git 1.9.2 or above)
" Plug 'fatih/vim-go', { 'tag': '*' }

" Plugin options
" Plug 'nsf/gocode', { 'tag': 'v.20150303', 'rtp': 'vim' }

" Plugin outside ~/.vim/plugged with post-update hook
" Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }

" Unmanaged plugin (manually installed and updated)
" Plug '~/my-prototype-plugin'

" NerdTree: file system explorer for the Vim editor
Plug 'scrooloose/nerdtree', { 'on': 'NERDTreeToggle' }

" Docker syntax and snippets
Plug 'ekalinin/Dockerfile.vim'

" HTML
Plug 'othree/html5.vim', { 'for': 'html' }
Plug 'alvan/vim-closetag', { 'for': ['html', 'javascript', 'jsx'] }

" JavaScript
Plug 'pangloss/vim-javascript', { 'for': ['javascript', 'jsx'] }
Plug 'mxw/vim-jsx', { 'for': ['javascript', 'jsx'] }

" TypeScript
Plug 'leafgarland/typescript-vim', { 'for': ['typescript'] }

" JSON
Plug 'elzr/vim-json', { 'for': 'json' }

" Less
Plug 'groenewege/vim-less', { 'for': 'less' }

" Markdown
Plug 'godlygeek/tabular', { 'for': 'markdown' }
Plug 'plasticboy/vim-markdown', { 'for': 'markdown' }

" Initialize plugin system
call plug#end()

set encoding=utf-8 fileencodings=ucs-bom,utf-8,cp936
set tabstop=4 softtabstop=0 expandtab shiftwidth=2 smarttab
set number
colorscheme molokai
let g:rehash256 = 1


map <F3> :NERDTreeToggle<CR>
"let g:NERDTreeShowLineNumbers=1  " 是否显示行号
let NERDTreeMinimalUI = 1
let NERDTreeDirArrows = 1

autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists("s:std_in") | exe 'NERDTree' argv()[0] | wincmd p | ene | exe 'cd '.argv()[0] | endif


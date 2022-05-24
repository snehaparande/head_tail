`head [-n count | -c bytes] [file ...]`

```
head file 
  displays the first 10 lines of the specified file.

head -c bytes file
  displays the first bytes of the specified file.

head -n count file
  displays the first count lines of the specified file. If count is omitted it defaults to 10.
```


`tail  [-r] [-q] [-c # | -n #] [file ...]`

```
tail file
  displays the last 10 lines of a file

tail -c number file
  displays the last bytes of the specified file.

tail -n number file
  displays the last lines of the specified file. If count is omitted it defaults to 10.

tail -r file
  The -r option causes the input to be displayed in reverse order, by line. 

tail -q file
  Suppresses printing of headers when multiple files are being examined.
```
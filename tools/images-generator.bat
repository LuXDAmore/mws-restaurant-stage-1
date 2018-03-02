@echo off

for %%i in (images/*.*) do ( magick convert images/%%i -resize 960 images/960/large@2-%%i )
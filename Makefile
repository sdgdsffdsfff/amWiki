name = AMWiki
html = _site
wikifile = am-team.github.io
tmpfile = tmp.tar.gz

git:
	@git pull
	@git add *
	@git commit -m "提交网站发布"
	@git push origin master

build:
	@gulp prebuild
	@nico build
	@cp ${wikifile}/default.html $(wikifile)/index.html


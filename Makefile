# Combine command: Install and run the app locally
install-run: install run

# Install npm packages
install:
	yarn

# Run the app
run:
	yarn dev

# Delete npm packages
clean:
	rm -rf node_modules
	yarn cache clean

# Git command sets:
test:
	echo argument is $(arg)

# build and add changes from current branch
add:
	yarn build
	git add .

# commit and push changes to vercel
fire:
	git commit -m "$m"
	git push

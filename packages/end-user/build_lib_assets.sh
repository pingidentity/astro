for dir in ./cdn/2.4.13-alpha.8/; do 
    mkdir $dir/icons; 
    mkdir $dir/logos; 
    mkdir $dir/images; 
done

cp -R ./src/icons/. ./cdn/*/icons/
cp -R ./src/logos/. ./cdn/*/logos/
cp -R ./src/images/. ./cdn/*/images

cp -R ./cdn/*/. ./lib/
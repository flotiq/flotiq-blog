directory="./public"

find "$directory" -type f -name "*.html" -print0 | while IFS= read -r -d $'\0' file; do

    sed -i 's\<script id="gatsby-script-loader">.*</script><script id="gatsby-chunk-mapping">\<script id="gatsby-chunk-mapping">\g' "$file"
done

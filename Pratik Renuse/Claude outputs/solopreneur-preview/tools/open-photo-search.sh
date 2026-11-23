#!/bin/bash
# Opens image searches for the solopreneurs, a few at a time, so you can pick
# and save the photos you want to use.
#
# Save each photo you pick into ~/Downloads/solopreneur-photos/
# named after the person, for example:
#   marc-lou-1.jpg   (main photo, shown first on the page)
#   marc-lou-2.jpg   (second photo, next to the quotes)
# The names for everyone are in founders.txt (the part before the | sign).
#
# Usage:
#   ./open-photo-search.sh            opens the first 5
#   ./open-photo-search.sh 6 10       opens numbers 6 to 10
#   ./open-photo-search.sh marc-lou   opens just one person

cd "$(dirname "$0")"
mkdir -p ~/Downloads/solopreneur-photos

FROM=${1:-1}
TO=${2:-5}

n=0
while IFS='|' read -r slug query; do
  [ -z "$slug" ] && continue
  n=$((n+1))
  if [[ "$FROM" =~ ^[0-9]+$ ]]; then
    { [ "$n" -lt "$FROM" ] || [ "$n" -gt "$TO" ]; } && continue
  else
    [ "$slug" != "$FROM" ] && continue
  fi
  q=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$query")
  echo "$n. $slug  ->  save as ~/Downloads/solopreneur-photos/$slug-1.jpg"
  open "https://www.google.com/search?tbm=isch&q=$q"
  sleep 0.4
done < founders.txt

open ~/Downloads/solopreneur-photos

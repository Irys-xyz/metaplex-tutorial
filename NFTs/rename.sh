declare -a words=("one" "two" "three" "four" "five" "six" "seven" "eight" "nine" "ten" "eleven" "twelve" "thirteen" "fourteen" "fifteen" "sixteen" "seventeen" "eighteen" "nineteen" "twenty")

for i in {0..19}; do
    mv "${i}.png" "${words[$i]}.png"
done

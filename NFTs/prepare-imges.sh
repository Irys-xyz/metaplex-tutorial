#!/bin/bash

# Check that we got at least 5 command line arguments
if [ "$#" -lt 5 ]; then
	echo "Usage: ./script.sh <folder_path> <file_extension> <name> <symbol> <description> [resize]"
	exit 1
fi

# Save the command line arguments into variables
FOLDER_PATH=$1
FILE_EXTENSION=$2
NAME=$3
SYMBOL=$4
DESCRIPTION=$5

# Check if the specified folder exists
if [ ! -d "$FOLDER_PATH" ]; then
	echo "The folder $FOLDER_PATH does not exist."
	exit 1
fi

# Create the originals subfolder
mkdir -p "./originals"

# Check if the file extension is either png or jpg
if [ "$FILE_EXTENSION" != "png" ] && [ "$FILE_EXTENSION" != "jpg" ]; then
	echo "The file extension must be either png or jpg."
	exit 1
fi

# Check if the sixth argument is set to "resize"
if [ "$6" == "resize" ]; then
	# Check if imagemagick is installed
	if ! command -v convert &>/dev/null; then
		echo "Error: ImageMagick is not installed. Install it to resize images."
		echo "On macOS, you can install ImageMagick with Homebrew using: brew install imagemagick"
		echo "On Ubuntu, you can install ImageMagick with apt-get using: sudo apt-get install imagemagick"
		echo "On Windows, you can download ImageMagick from https://imagemagick.org/script/download.php#windows and follow the provided instructions."
		exit 1
	fi
	RESIZE="true"
else
	RESIZE="false"
fi

# Find all files with the specified extension in the folder
FILES=$(find "$FOLDER_PATH" -maxdepth 1 -type f -name "*.$FILE_EXTENSION")

# Initialize a counter
COUNTER=0

# Copy and rename the files
for FILE in $FILES; do
	# Extract the file name
	FILE_NAME=$(basename -- "$FILE")
	FILE_NAME="${FILE_NAME%.*}"

	# Copy the file to the originals subfolder
	cp "$FILE" "./originals"

	# Check if the file is named "collection"
	if [ "$FILE_NAME" != "collection" ]; then
		# Rename the file in the main directory
		mv "$FILE" "$FOLDER_PATH/$COUNTER.$FILE_EXTENSION"
		FILE_NAME=$COUNTER

		# Check if we need to resize the image
		if [ "$RESIZE" == "true" ]; then
			convert "$FOLDER_PATH/$FILE_NAME.$FILE_EXTENSION" -resize 800x800 -gravity center -extent 800x800 "$FOLDER_PATH/$FILE_NAME.$FILE_EXTENSION"
		fi
	fi

	# Create JSON file
	if [ "$FILE_NAME" != "collection" ]; then
		JSON_NAME="$NAME #$((COUNTER + 1))"
	else
		JSON_NAME="$NAME"
	fi

	echo "{
  \"name\": \"$JSON_NAME\",
  \"symbol\": \"$SYMBOL\",
  \"description\": \"$DESCRIPTION\",
  \"image\": \"$FILE_NAME.$FILE_EXTENSION\",
  \"properties\": {
    \"files\": [
      {
        \"uri\": \"$FILE_NAME.$FILE_EXTENSION\",
        \"type\": \"image/$FILE_EXTENSION\"
      }
    ]
  }
}" >"$FOLDER_PATH/$FILE_NAME.json"

	# Increment the counter if the file was not "collection"
	if [ "$FILE_NAME" != "collection" ]; then
		let COUNTER=COUNTER+1
	fi
done

echo "Files successfully processed. Original files are stored in $FOLDER_PATH/originals and can be deleted if no longer needed."

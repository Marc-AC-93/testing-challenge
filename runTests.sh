#!/bin/bash

# STYLES
BOLD="\033[1m"
BLUE="\033[0;34m"   #
RED="\033[91m"      #
YELLOW="\033[93m"   #
GREEN="\033[0;32m"  #
ENDC="\033[0m"      # finish style

echo -e "\n······································"
echo -e "·             $BOLD$BLUE TEST RUN$ENDC$ENDC              ·"
echo -e "······································\n"

env=$1
config=$2

shift 2

while getopts :p:t:r:i:h flag; do
    case $flag in
        p)
          project=$(echo "${OPTARG}");;
        t)
          tag=$(echo "${OPTARG}");;
        r)
          reporter=$(echo "${OPTARG}");;
        i)
          ui="--ui";;
        h)
          headed="--headed"
    esac
done

calculate_time_difference() {
    timestamp1="$1"
    timestamp2="$2"
    difference=$((timestamp2 - timestamp1))

    hours=$((difference / 3600))
    minutes=$(( (difference % 3600) / 60 ))
    seconds=$((difference % 60 ))

    echo -e "[Execution time]$BLUE ${hours}h:${minutes}m:${seconds}s$ENDC"
}

browser="--project=chrome --project=safari --project=mobileChrome --project=mobileSafari"

[[ ! $env =~ ^(local|docker)$ ]] &&  echo -e "$RED$BOLD[Error]$ENDC Rerun the script selecting a valid config:\n   · local\n   · docker$ENDC" && exit 1;
[[ ! $config =~ ^(local|stage|prod)$ ]] &&  echo -e "$RED$BOLD[Error]$ENDC Rerun the script selecting a valid config:\n   · local\n   · stage\n   · prod$ENDC" && exit 2;
[[ ! -z $tag ]] && filter="-g (?=.*@$tag)" || filter=""
if [[ ! -z $project ]]; then
  [[ ! $project =~ ^(worker|chrome|mobileChrome|safari|mobileSafari)$ ]] &&  echo -e "[Error] Rerun the script selecting a valid project:\n   · worker\n   · chrome\n   · mobileChrome\n   · safari\n   · mobileSafari" && exit 3;
  worker="--project=$project";
else
  worker=$browser
fi

if [[ $project == "worker" ]]; then
  headed=""
fi

if [[ ! -z $reporter ]]; then
  [[ ! $reporter =~ ^(allure|playwright)$ ]] &&  echo -e "$RED$BOLD[Error]$ENDC Rerun the script selecting a valid reporter:\n   · allure\n   · playwright$ENDC" && exit 3;
fi

echo -e "$BOLD\nTest Configuration:$ENDC"
echo -e "$BOLD   · Environment:$BLUE $env $ENDC $ENDC";
echo -e "$BOLD   · Configuration:$BLUE $config $ENDC $ENDC";

if [ ! -z $tag ]; then
  echo -e "$BOLD   · Test filter:$BLUE $tag $ENDC $ENDC"
fi

if [ $env == "docker" ]; then
  npm run docker-build
  start_time=$(date "+%s")
  npm run docker-run_$config -- $worker $filter
else
  start_time=$(date "+%s")
  npm run $config -- $worker $ui $filter $headed
fi

end_time=$(date "+%s")

calculate_time_difference "$start_time" "$end_time"

if [[ ! -z $reporter ]]; then
  npm run report_$reporter
fi

exit 0

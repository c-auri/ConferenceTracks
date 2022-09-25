# ConferenceTrackManagement
## Time Constraints
- A talk must not have a duration less than 5 minutes.
- The default constraints for the morning session are from 9:00 AM to 12:00 PM exactly.
- Lunch is hard coded from 12:00 PM to 1:00 PM.
- The default constraints for the afternoon session are from 13:00 PM to 16:00 PM at the earliest and 17:00 PM at the latest.

## Compromises
- The session time constraints (start, earliest end and latest end) are somewhat customizable, but must always be at full hours of the same day. The assignment did not specify any customizability needs, but I did not want to hard code too many magic numbers.
- Variables holding time as integers are measured in minutes if not specified otherwise. This is not very clean, a dedicated Time class would be better. But since I'm not familiar with JavaScripts Date arithmetics this seemed like an easy compromise that wouldn't make too much trouble.

## Input rules
- A talk is defined by a single line containing the full title followed by the time specification.
- Titles may contain numbers.
- The time specification must be seperated from the title by whitespace.
- The time specification can either be 'lightning' (5 minutes) or given in minutes. The unit of measurement may be given or omitted.
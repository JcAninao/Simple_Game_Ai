import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
public class MainInterface {
    static final char blank = ' ';
    static char player_token = blank;
    static char computer_token = blank;
    static char[][] placed_tokens = new char[3][3]; 
    static Scanner scanner = new Scanner(System.in);
    static boolean isComputerToMove = true;
    static String player_name = "You";
    static Random randomizer = new Random();
    static ArrayList<String> moves_log = new ArrayList<>();
    public static void main(String[] args) {
        System.out.println("Tic Tac Toe! Enter your player name!");
        player_name = scanner.nextLine();
        System.out.println("Choose your token:\n" +
                "- [X] - First to move\n" +
                "- [O] - Second to move\n" +
                "to play against the computer!");

        String user_token_placeholder = scanner.nextLine();
        while (!user_token_placeholder.equalsIgnoreCase("X") && !user_token_placeholder.equalsIgnoreCase("O")) {
                System.out.println("Invalid token. Please choose either X or O.");
                user_token_placeholder = scanner.nextLine();
        }

        player_token = Character.toUpperCase(user_token_placeholder.charAt(0));
        System.out.println(player_name + " chose " + player_token + ". The computer will be " +
                (Character.toString(player_token).equalsIgnoreCase("x") ? 'O' : 'X') + ".");


        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                placed_tokens[i][j] = blank;
            }
        }

        if (player_token == 'X'){
            computer_token = 'O';
            Board(placed_tokens);
            PlaceToken();
        } else {
            computer_token = 'X';
            isComputerFirstToMove = true;
            isComputerToMove = true;
            CheckIfGameOver("Computer");
//            ComputerMove();
        }



    }

    public static void CheckIfGameOver(String winner) {
        char token_to_check = winner.equals(player_name) ? player_token : computer_token;
        boolean isGameSet = false;
        for (int i = 0; i < 3; i++) {
            if (placed_tokens[i][0] == token_to_check && placed_tokens[i][1] == token_to_check && placed_tokens[i][2] == token_to_check) {
                isGameSet = true;
                break;
            }
            if (placed_tokens[0][i] == token_to_check && placed_tokens[1][i] == token_to_check && placed_tokens[2][i] == token_to_check) {
                isGameSet = true;
                break;
            }
        }

        if (placed_tokens[1][1] == token_to_check){
            if (placed_tokens[0][0] == token_to_check && placed_tokens[2][2] == token_to_check) {
                isGameSet = true;
            } else if (placed_tokens[0][2] == token_to_check && placed_tokens[2][0] == token_to_check) {
                isGameSet = true;
            }
        }

        if (isGameSet) {
            System.out.println("Game Set! " + winner + " win!");
            System.exit(0);
        } else if (isBoardFull()) {
            System.out.println("Game Set! It's a draw!");
            System.exit(0);
        } else if (isComputerToMove){
            moves_log.add(computer_token + " at " + ComputerAction().toUpperCase() + "\tComputer");
            Board(placed_tokens);
            isComputerToMove = false;
            CheckIfGameOver("Computer");
        } else {
            PlaceToken();
        }
    }

    // ausin kapag first to move yung player, at ung logging ng comp
    public static String ComputerMoves(boolean isAttacking){
        char token_to_check = isAttacking ? computer_token : player_token;
        char token_to_place = computer_token;
        for (int i = 0; i < 3; i++) {
            // horizontal
            if (placed_tokens[i][0] == token_to_check) {
                if (placed_tokens[i][1] == token_to_check) {
                    if (placed_tokens[i][2] == blank) {
                        placed_tokens[i][2] = token_to_place;
                        return (i + 1) + "C";
                    }
                } else if (placed_tokens[i][2] == token_to_check) {
                    if (placed_tokens[i][1] == blank) {
                        placed_tokens[i][1] = token_to_place;
                        return (i + 1) + "B";
                    }
                }
            }
            if (placed_tokens[i][1] == token_to_check) {
                if (placed_tokens[i][2] == token_to_check) {
                    if (placed_tokens[i][0] == blank) {
                        placed_tokens[i][0] = token_to_place;
                        return (i + 1) + "A";
                    }
                }
            }

            // vertical
             if (placed_tokens[0][i] == token_to_check) {
                if (placed_tokens[1][i] == token_to_check) {
                    if (placed_tokens[2][i] == blank) {
                        placed_tokens[2][i] = token_to_place;
                        return "3" + (char)(65 + i);
                    } // character value of 65 is capital letter 'A'
                } else if (placed_tokens[2][i] == token_to_check) {
                    if (placed_tokens[1][i] == blank) {
                        placed_tokens[1][i] = token_to_place;
                        return "2" + (char)(65 + i);
                    }
                }
             }
             if (placed_tokens[1][i] == token_to_check) {
                if (placed_tokens[2][i] == token_to_check) {
                    if (placed_tokens[0][i] == blank) {
                        placed_tokens[0][i] = token_to_place;
                        return "1" + (char)(65 + i);
                    }
                }
            }
        }

        // diagonal
        // ends
        if (placed_tokens[0][0] == token_to_check) {
            if (placed_tokens[2][2] == token_to_check){
                if (placed_tokens[1][1] == blank){
                    placed_tokens[1][1] = token_to_place;
                    return "2B";
                }
            }
        }
        if (placed_tokens[0][2] == token_to_check) {
            if (placed_tokens[2][0] == token_to_check){
                if (placed_tokens[1][1] == blank){
                    placed_tokens[1][1] = token_to_place;
                    return "2B";
                }
            }
        }

        // mid to diagonal
        if (placed_tokens[1][1] == token_to_check){ // is mid area occupied
            if (placed_tokens[0][0] == token_to_check){
                if (placed_tokens[2][2] == blank){
                    placed_tokens[2][2] = token_to_place;
                    return "3C";
                }
            } else if (placed_tokens[0][2] == token_to_check){
                if (placed_tokens[2][0] == blank){
                    placed_tokens[2][0] = token_to_place;
                    return "3A";
                }
            } else if (placed_tokens[2][0] == token_to_check){
                if (placed_tokens[0][2] == blank){
                    placed_tokens[0][2] = token_to_place;
                    return "1C";
                }
            } else if (placed_tokens[2][2] == token_to_check){
                if (placed_tokens[0][0] == blank){
                    placed_tokens[0][0] = token_to_place;
                    return "1A";
                }
            }
        }
        return "";
    }

    public static String ComputerAction() {
        if (!isComputerFirstMoveDone && isComputerFirstToMove){ // initial move
            if (placed_tokens[0][0] == blank){ // always get the top most corner
                placed_tokens[0][0] = computer_token;
            }
            isComputerFirstMoveDone = true;
            return "1A";
        }

        String computerMovePlaceholder = ComputerMoves(true);
        if (!computerMovePlaceholder.isEmpty())// try winning
            return computerMovePlaceholder; // return of move is made

        if (isComputerFirstMoveDone){ // to counter losing
            computerMovePlaceholder = ComputerMoves(false);
            if (!computerMovePlaceholder.isEmpty())
                return computerMovePlaceholder; // return of move is made
        } // continues if no possible win / player win to block


        // initial move (if not the first to move)
        if (!isComputerFirstToMove && !isComputerFirstMoveDone){
            if (placed_tokens[1][1] == blank){
                placed_tokens[1][1] = computer_token;
                isComputerFirstMoveDone = true;
                return "2B";
            }
            else {
                if (placed_tokens[0][0] == blank){
                    placed_tokens[0][0] = computer_token;
                    isComputerFirstMoveDone = true;
                    return "1A";
                } else if (placed_tokens[0][2] == blank){
                    placed_tokens[0][2] = computer_token;
                    isComputerFirstMoveDone = true;
                    return "1C";
                }
            }
        }

        if (isComputerFirstMoveDone) {
            if (placed_tokens[0][0] == computer_token){ // upper left check
                if (placed_tokens[0][2] == blank && placed_tokens[0][1] != player_token){
                    placed_tokens[0][2] = computer_token;
                    return "1C";
                } else if (placed_tokens[2][0] == blank && placed_tokens[1][0] != player_token){
                    placed_tokens[2][0] = computer_token;
                    return "3A";
                }
            }

            if (placed_tokens[0][2] == computer_token){ // upper right check
                if (placed_tokens[0][0] == blank && placed_tokens[0][1] != player_token){
                    placed_tokens[0][0] = computer_token;
                    return "1A";
                } else if (placed_tokens[2][2] == blank && placed_tokens[1][2] != player_token){
                    placed_tokens[2][2] = computer_token;
                    return "3C";
                }
            }


            if (placed_tokens[0][0] == computer_token &&
                    placed_tokens[2][2] == blank){
                placed_tokens[2][2] = computer_token;
                return "3C";
            }

            if (placed_tokens[0][2] == computer_token &&
                    placed_tokens[2][0] == blank){
                placed_tokens[2][0] = computer_token;
                return " 3A";
            }

            // fallback - random move
            while (true){
                int row = randomizer.nextInt(3);
                int col = randomizer.nextInt(3);
                if (placed_tokens[row][col] == blank){
                    placed_tokens[row][col] = computer_token;
                    return String.valueOf(row + 1) + (char)(65 + col);
                }
            }
        }
        return "error occurred";
    }
    static boolean isComputerFirstMoveDone = false;
    static boolean isComputerFirstToMove = false;

    public static boolean isBoardFull() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (placed_tokens[i][j] == blank) {
                    return false;
                }
            }
        }
        return true;
    }

    public static void PlaceToken() {
        boolean isValidCoordinate = true;
        String coordinate = "";
        while (true) {
            System.out.print("Enter the row and column to place your token (e.g., 1A or A1 for upper left): ");
            coordinate = scanner.nextLine().toUpperCase();
            if (coordinate.length() == 2) { 
                char rowChar = coordinate.charAt(0);
                char colChar = coordinate.charAt(1);
                
                isValidCoordinate = (rowChar >= '1' && rowChar <= '3') && (Character.toUpperCase(colChar) >= 'A' && Character.toUpperCase(colChar) <= 'C') ||
                                    (colChar >= '1' && colChar <= '3') && (Character.toUpperCase(rowChar) >= 'A' && Character.toUpperCase(rowChar) <= 'C');
                if (!isValidCoordinate) {
                    System.out.println("Invalid coordinate format. Please enter a valid coordinate (e.g., 1A or A1):");
                    continue;
                }   
                if (coordinate.charAt(0) >= 'A' && coordinate.charAt(0) <= 'C') {
                    colChar = coordinate.charAt(0);
                    rowChar = coordinate.charAt(1);
                }
                colChar = Character.toUpperCase(colChar);
                int col = (colChar == 'A' ? 1 : colChar == 'B' ? 2 : 3) - 1;
                int row = (rowChar - '0') - 1;

                if (placed_tokens[row][col] == blank) {
                    placed_tokens[row][col] = player_token;
                    moves_log.add(player_token + " at " + coordinate.toUpperCase() + "\t" + player_name);
                } else isValidCoordinate = false;
            } else {
                if (coordinate.equalsIgnoreCase("board")) {
                    Board(placed_tokens);
                    continue;
                }
                isValidCoordinate = false;
            }

            if (isValidCoordinate) {
                break;
            }
            System.out.println("Invalid coordinate. Please enter a valid coordinate (e.g., 1A or A1):");
        }
        Board(placed_tokens);
        isComputerToMove = true;
        CheckIfGameOver(player_name);
    }

    public static void UpdateBoard(char[][] placed_token, int row, int col) {
        while (true){
            if (placed_token[row][col] == blank) {
                placed_token[row][col] = player_token;
                break;
            } else {
                System.out.println("Cell is already occupied. Please choose another cell.");
            }
        }
    }

    public static void Board(char[][] placed_tokens) {
        boolean isLogsNotEmpty = !moves_log.isEmpty();
        int tmpNum = 0;
        System.out.printf("  │ A │ B │ C\tMove Log\n");
        for (int i = 0; i < 3; i++) {
            System.out.print("──┼───┼───┼───\t");
            if (isLogsNotEmpty && tmpNum < moves_log.size()) {
                System.out.println(moves_log.get(moves_log.size() - (tmpNum + 1)));
                tmpNum++;
            } else System.out.println();
            System.out.printf("%s │ %s │ %s │ %s\t",
                    i + 1,
                    placed_tokens[i][0],
                    placed_tokens[i][1],
                    placed_tokens[i][2]
            );
            if (isLogsNotEmpty && tmpNum < moves_log.size()) {
                System.out.println(moves_log.get(moves_log.size() - (tmpNum + 1)));
                tmpNum++;
            } else System.out.println();
        }
        System.out.println();
    }
}

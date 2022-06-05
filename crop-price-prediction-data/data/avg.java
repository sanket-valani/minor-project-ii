import java.util.*;

class avg{
  public static void main(String[] args) {
    Scanner x = new Scanner(System.in);
    String str="";
    try{
      while(true){
        str = x.nextLine();
        String arr[] = str.split(" ");
        int sum = 0;
        for(String temp:arr ){
          sum += Double.parseDouble(temp);
        }
        System.out.println(sum/arr.length+"\n");
      }  
    } catch(Exception e){
      x.close();
    }
  }
}
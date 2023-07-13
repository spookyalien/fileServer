using System;
using System.Net;
using System.Net.Sockets;
using System.Text;


public class SocketListener
{
    public static int Main(String[] args)
    {
        start();
        return 0;
    }

    public static void start()
    {
        IPHostEntry host = Dns.GetHostEntry("localhost");
        IPAddress ipAddress = host.AddressList[0];
        IPEndPoint localEndPoint = new IPEndPoint(ipAddress, 11000);

        try {
            Socket listener = new Socket(ipAddress.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
            listener.Bind(localEndPoint);
            // Listen(n) n = num connections
            listener.Listen(10);

            Console.WriteLine("Waiting for a connection...");
            Socket handler = listener.Accept();

             string data = null;
             byte[] bytes = null;

            while (true) {
                bytes = new byte[1024];
                int bytesRec = handler.Receive(bytes);
                data += Encoding.ASCII.GetString(bytes, 0, bytesRec);
                if (data.IndexOf("<EOF>") > -1)
                {
                    break;
                }
            }

            Console.WriteLine("Text received : {0}", data);

            byte[] msg = Encoding.ASCII.GetBytes(data);
            handler.Send(msg);
            handler.Shutdown(SocketShutdown.Both);
            handler.Close();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }

        Console.WriteLine("\n Press any key to continue...");
        Console.ReadKey();
    }
}
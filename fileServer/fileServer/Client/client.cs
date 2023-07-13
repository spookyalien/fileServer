using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

public class SocketClient
{
    public static int Main(String[] args)
    {
        start();
        return 0;
    }

    public static void start()
    {
        byte[] bytes = new byte[1024];

        try
        {
            IPHostEntry host = Dns.GetHostEntry("localhost");
            IPAddress ipAddress = host.AddressList[0];
            IPEndPoint server = new IPEndPoint(ipAddress, 11000);

            Socket sender = new Socket(ipAddress.AddressFamily,
                SocketType.Stream, ProtocolType.Tcp);
            try
            {
                sender.Connect(server);

                Console.WriteLine("Socket connected to {0}",
                    sender.RemoteEndPoint.ToString());

                byte[] msg = Encoding.ASCII.GetBytes("This is a test<EOF>");

                int bytesSent = sender.Send(msg);
                int bytesRec = sender.Receive(bytes);
                Console.WriteLine("Echoed test = {0}",
                    Encoding.ASCII.GetString(bytes, 0, bytesRec));

                sender.Shutdown(SocketShutdown.Both);
                sender.Close();

            }
            catch (ArgumentNullException ane)
            {
                Console.WriteLine("ArgumentNullException : {0}", ane.ToString());
            }
            catch (SocketException se)
            {
                Console.WriteLine("SocketException : {0}", se.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine("Unexpected exception : {0}", e.ToString());
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }
}
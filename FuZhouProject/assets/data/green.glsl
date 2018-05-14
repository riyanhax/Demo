precision mediump float;

uniform sampler2D u_image;
uniform float u_opacity;
varying vec2 v_texCoord;

void main() {

    vec4 textureColor = texture2D(u_image, v_texCoord);
    vec3 rgb = textureColor.rgb;

    float R = rgb.x;
    float G = rgb.y;
    float B = rgb.z;
    vec3 hsv;
    float max1=max(R,max(G,B));
    float min1=min(R,min(G,B));
    if (R == max1)
    {
        hsv.x = (G-B)/(max1-min1);
    }
    if (G == max1)
    {
        hsv.x = 2.0 + (B-R)/(max1-min1);
    }
    if (B == max1)
    {
        hsv.x = 4.0 + (R-G)/(max1-min1);
    }
    hsv.x = hsv.x * 60.0;
    if (hsv.x < 0.0)
    {
        hsv.x = hsv.x + 360.0;
    }

    hsv.z=max1*0.4;
    hsv.y=(max1-min1)*0.8/max1;
  //  hsv.x=215.0;



    if( hsv.y == 0.0 )
    {
        R=G=B=hsv.z;
    }
    else
    {
        hsv.x = hsv.x/60.0;
        int i = int(hsv.x);
        float f = hsv.x - float(i);
        float a = hsv.z * ( 1.0 - hsv.y );
        float b = hsv.z * ( 1.0 - hsv.y * f );
        float c = hsv.z * ( 1.0 - hsv.y * (1.0 - f ) );
        if(i==0)
        {
            R = hsv.z; G = c; B = a;
        }
        else if(i==1)
        {
            R = b; G = hsv.z; B = a;
        }
        else if(i==2)
        {
            R = a; G = hsv.z; B = c;
        }
        else if(i==3)
        {
            R = a; G = b; B = hsv.z;
        }
        else if(i==4)
        {
            R = c; G = a; B = hsv.z;
        }
        else
        {
            R = hsv.z; G = a; B = b;
        }


    }

    vec4 ret=vec4(R,G,B,1.0);
    gl_FragColor = ret * u_opacity;



}



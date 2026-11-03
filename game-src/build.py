import sys,base64,re,os
src,assets,out=sys.argv[1:4]
s=open(src,encoding='utf8').read()
def rep(m):
    f=os.path.join(assets,m.group(1)+'.webp')
    return 'data:image/webp;base64,'+base64.b64encode(open(f,'rb').read()).decode()
s=re.sub(r'__IMG_(\w+?)__',rep,s)
open(out,'w',encoding='utf8').write(s)
print(len(s)//1024,'KB')

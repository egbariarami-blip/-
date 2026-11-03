import sys, os
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
def L(n): return Image.open(f'{src}/image{n}.png').convert('RGB')
crops = {
 'cover':(3,(788,245,1158,730)), 'heroSalim':(4,(115,120,425,415)), 'heroSirhan':(4,(905,200,1100,425)),
 'goblin':(4,(1190,555,1376,738)), 'evA':(6,(186,486,398,682)), 'evB':(6,(594,484,804,688)), 'evC':(6,(990,476,1212,680)),
 'train':(6,(140,228,1270,425)), 'wellElf':(7,(120,215,565,705)), 'happy':(9,(955,0,1376,335)),
 'sad':(10,(500,186,880,440)), 'salim':(13,(0,250,420,705)), 'wallet':(15,(490,320,890,560)),
}
for k,(n,box) in crops.items():
    L(n).crop(box).save(f'{out}/{k}.webp', quality=84, method=6)
for k,n in {'intro':1,'map':2,'chal':11}.items():
    L(n).save(f'{out}/{k}.webp', quality=82, method=6)
for n in [3,4,5,6,7,8,12,13,14,15,1]:
    im = L(n).resize((460,257), Image.LANCZOS).filter(ImageFilter.GaussianBlur(9))
    im.save(f'{out}/bg{n}.webp', quality=60, method=6)

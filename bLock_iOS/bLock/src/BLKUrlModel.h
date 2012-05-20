//
//  BLKUrlModel.h
//  bLock
//
//  Created by Mario Gonzalez on 5/20/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
@interface BLKUrlModel : NSObject {
}

+(BLKUrlModel*) sharedInstance;;
-(NSString*)getURLForPath:(NSString*)aPath;
@end

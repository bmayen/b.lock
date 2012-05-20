//
//  Constants.h
//  Freshly
//
//  Created by Mario Gonzalez on 12/29/11.
//  Copyright (c) 2011 __MyCompanyName__. All rights reserved.
//



#ifndef __B_LOCK_CONSTANTS_H_
#define __B_LOCK_CONSTANTS_H_

#define ARC4RANDOM_MAX      0x100000000

// Core data model
static NSString* const kCoreDataModelNameBikes = @"Bikes";
static NSString* const kURLPrefixServerProtocol = @"http";
static NSString* const kURLPrefixServerSubdomain = @"";
static NSString* const kURLPrefixServerDomain = @"localhost";
static NSString* const kURLPrefixServerPort = @"8666";


// http://localhost:8666/rider/lock-value/set/0/false
// http://localhost:8666/rider/lock-value/set/0/true
// http://localhost:8666/rider/lock-value/get/0

#endif
